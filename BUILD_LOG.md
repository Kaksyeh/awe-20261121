# BUILD_LOG.md — awe-20261121

## What the program does
`main.ts` (Node 22, standard library only) writes one short relaxing text to
`entry.txt` in the output directory (`MAKEFUN_OUTPUT_DIR` when set, falling
back to `/output`). The text is fixed inside the program, so every run
produces byte-identical output. No input, no network, no other output.

## The chosen text (v1)
> The lighthouse turns, and turns again.
> Above it, the stars are still arriving —
> light that set out before anyone alive
> had a name for it, only now reaching us.

159 Unicode code points, 4 lines, valid UTF-8.

## Improvement (v2 — second edit of main.ts)
Two genuine improvements in one edit:
1. **Text:** the comma in the last line became an em-dash — "had a name
   for it — only now reaching us." The dash adds a pause before the
   landing, so the final line arrives more slowly and the thought
   (ancient light reaching us now) has room to keep growing.
2. **Program:** after writing, the program reads the output back and
   throws unless its length matches the text, so a truncated or failed
   write can never pass silently.

Final text (160 Unicode code points, 4 lines, 164 bytes):

## Candidates considered (drafted fresh in this session — see ../awe-candidates.md)
- **A — the tide:** calm, but its last line explains the calm instead of
  letting the image do it, and "for longer than the shore remembers" is a
  muddled image. Loses on craft and on the ending.
- **B — the lighthouse and the arriving stars (chosen):** slowest pace,
  cleanest rhythm, and the strongest dwarfing image — light that set out
  before anyone alive had a name for it, only now reaching us. The thought
  keeps growing after the last line. No instruction, no stock phrasing.
- **C — the river stone:** unhurried and concrete, but the dwarfing is
  modest — a stone in a river is slow, not vast.

## Verification (v1)
- Program run twice into two different output directories; the two
  `entry.txt` files are byte-identical (same sha256:
  5ad1655ca2ffcc9dc999ecaf730cd673fd90bb1269a42235b6583a4019893476).
- 159 Unicode code points (within the 1–280 gate), 4 lines with real line
  breaks, not only whitespace, valid UTF-8.

## Verification (v2, final)
- Program run twice into two different output directories; the two
  `entry.txt` files are byte-identical (same sha256:
  bcc598e19c26fe78691950f3dd3cb3ad8784e3762e08188c57412826f249e789).
- **160 Unicode code points** (within the 1–280 gate), 4 lines with real
  line breaks, not only whitespace, valid UTF-8, 164 bytes.
- **Guard proven with a negative test:** a copy of main.ts rigged to write
  only the first 10 characters threw
  `Error: entry.txt is 10 characters, expected 160 characters` and exited
  with code 1.

## How to run
```sh
node main.ts
# writes /output/entry.txt; set MAKEFUN_OUTPUT_DIR to change the directory
```
