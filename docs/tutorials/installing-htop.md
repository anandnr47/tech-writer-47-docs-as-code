---
id: installing-htop
title: Installing and Using htop
---

# Installing and Using htop

htop is an interactive process viewer for Linux and other Unix-like systems. Unlike the standard `top` command, htop lets you scroll vertically and horizontally, sort and filter processes, and kill processes without entering their PID — all from a color-coded, keyboard-driven interface.

---

## Installation

### Ubuntu / Debian

```bash
sudo apt update && sudo apt install htop
```

### CentOS / RHEL / Fedora

```bash
sudo dnf install htop
```

On older CentOS 7 systems:

```bash
sudo yum install epel-release && sudo yum install htop
```

### macOS

```bash
brew install htop
```

### Verify

```bash
htop --version
```

---

## Starting htop

```bash
htop
```

To monitor a specific user's processes only:

```bash
htop -u username
```

To set the refresh interval (in tenths of a second):

```bash
htop -d 20    # refresh every 2 seconds
```

---

## Reading the Interface

### Header — System Meters

The top section shows system-wide resource usage:

```
  1  [||||||||||||||||||||||||||||||||  45.2%]   Tasks: 112, 280 thr; 2 running
  2  [|||||||||                         12.1%]   Load average: 0.52 0.48 0.43
  3  [|||||||||||||||||||||||||||       38.7%]   Uptime: 3 days, 04:22:11
  4  [||                                 3.0%]
  Mem[||||||||||||||||||||||||||  3.54G/15.5G]
  Swp[                               0K/2.00G]
```

| Meter | What it shows |
|---|---|
| CPU bars (1, 2, 3…) | Per-core usage. Color indicates user, system, and I/O wait time. |
| Mem | Used vs total RAM. Green = used, blue = buffers, yellow = cache. |
| Swp | Swap usage. High swap indicates memory pressure. |
| Load average | 1, 5, and 15-minute averages. Values above your CPU count indicate overload. |

### Process List

| Column | Description |
|---|---|
| PID | Process ID |
| USER | Owner of the process |
| PRI / NI | Priority and nice value |
| VIRT | Total virtual memory used |
| RES | Resident (physical) RAM used |
| CPU% | CPU usage since last refresh |
| MEM% | Percentage of total RAM |
| TIME+ | Total CPU time consumed |
| Command | Full command line |

---

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `F1` / `h` | Help |
| `F2` / `S` | Setup (configure meters, colors, columns) |
| `F3` / `/` | Search for a process by name |
| `F4` / `\` | Filter — show only matching processes |
| `F5` / `t` | Toggle tree view (shows parent/child relationships) |
| `F6` | Sort by column |
| `F9` / `k` | Kill selected process (choose signal) |
| `F10` / `q` | Quit |
| `Space` | Tag a process (for bulk operations) |
| `u` | Filter by user |
| `P` | Sort by CPU usage |
| `M` | Sort by memory usage |
| `T` | Sort by time |
| `I` | Invert sort order |

---

## Common Tasks

**Kill a process**
Use arrow keys to select the process, press `F9`, choose signal `15` (SIGTERM) for a graceful stop or `9` (SIGKILL) to force-kill.

**Find what's using the most CPU**
Press `P` to sort by CPU% descending.

**Find a process by name**
Press `F4` and type part of the process name. The list filters in real time.

**See process relationships**
Press `F5` to switch to tree view. Child processes are indented under their parent.

---

## Further Reading

- [htop project page](https://htop.dev/)
- [htop GitHub repository](https://github.com/htop-dev/htop)
- `man htop` — full manual page
