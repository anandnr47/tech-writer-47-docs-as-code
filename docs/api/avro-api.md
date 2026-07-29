---
id: avro-api
title: Apache Avro API
---

# Apache Avro API

Apache Avro is a data serialization framework. It stores data in a compact binary format alongside a JSON schema that describes the structure. This makes Avro files self-describing — a reader always knows the field names and types, even without access to the original code.

Avro is widely used in data pipelines, Kafka messaging, and Hadoop ecosystems where schema evolution and compact storage matter.

---

## Core Concepts

| Concept | Description |
|---|---|
| **Schema** | A JSON definition of the data structure — field names, types, defaults |
| **Serialization** | Converting a Python object to Avro binary format |
| **Deserialization** | Reading Avro binary back into Python objects |
| **Schema evolution** | Adding or removing fields without breaking existing readers |

---

## Installation

```bash
pip install fastavro
```

---

## Defining a Schema

Schemas are JSON objects. Each field has a `name` and a `type`.

```python
schema = {
    "type": "record",
    "name": "SensorReading",
    "namespace": "com.example.iot",
    "doc": "A single reading from an IoT temperature sensor.",
    "fields": [
        {"name": "station_id", "type": "string"},
        {"name": "timestamp",  "type": "long"},
        {"name": "temperature","type": "float"},
        {"name": "unit",       "type": {"type": "enum", "name": "TempUnit", "symbols": ["C", "F"]}}
    ]
}
```

**Primitive types:** `null`, `boolean`, `int`, `long`, `float`, `double`, `bytes`, `string`

**Complex types:** `record`, `enum`, `array`, `map`, `union`, `fixed`

**Optional fields** use a union with `null`:

```python
{"name": "location", "type": ["null", "string"], "default": null}
```

---

## Writing Avro Files

```python
from fastavro import writer, parse_schema

parsed_schema = parse_schema(schema)

records = [
    {"station_id": "SNS-001", "timestamp": 1719824000, "temperature": 22.5, "unit": "C"},
    {"station_id": "SNS-002", "timestamp": 1719824060, "temperature": 71.6, "unit": "F"},
]

with open("readings.avro", "wb") as f:
    writer(f, parsed_schema, records)
```

`parse_schema()` validates the schema and prepares it for use. Always call it before writing.

---

## Reading Avro Files

```python
from fastavro import reader

with open("readings.avro", "rb") as f:
    for record in reader(f):
        print(record)
```

**Output:**

```python
{'station_id': 'SNS-001', 'timestamp': 1719824000, 'temperature': 22.5, 'unit': 'C'}
{'station_id': 'SNS-002', 'timestamp': 1719824060, 'temperature': 71.6, 'unit': 'F'}
```

The reader automatically uses the schema embedded in the file.

---

## Schema Evolution

Avro is designed so that schemas can change over time without breaking readers. The rules:

| Change | Safe? | Notes |
|---|---|---|
| Add a field with a default | Yes | Old readers ignore the new field |
| Remove a field with a default | Yes | New readers use the default |
| Rename a field | With alias | Add the old name as an `alias` |
| Change a field type | No | Not backwards compatible |

**Example — adding a field safely:**

```python
{"name": "humidity", "type": ["null", "float"], "default": null}
```

Old files without `humidity` are still readable — the field defaults to `null`.

---

## Using a Schema File

For production use, store schemas in `.avsc` files instead of inline Python dicts.

`sensor_reading.avsc`:

```json
{
  "type": "record",
  "name": "SensorReading",
  "fields": [
    {"name": "station_id", "type": "string"},
    {"name": "timestamp",  "type": "long"},
    {"name": "temperature","type": "float"}
  ]
}
```

Load it in Python:

```python
import fastavro.schema

schema = fastavro.schema.load_schema("sensor_reading.avsc")
```

---

## Further Reading

- [Apache Avro specification](https://avro.apache.org/docs/current/specification/)
- [fastavro documentation](https://fastavro.readthedocs.io/)
- [Avro schema evolution guide](https://avro.apache.org/docs/current/spec.html#Schema+Resolution)
