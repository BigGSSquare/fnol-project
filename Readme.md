# Autonomous FNOL Processing Agent

**Lightweight, explainable agent for First Notice of Loss (FNOL) document processing and intelligent routing**

## Quick Start

1 --> clone the project and run npm install in the terminal to get all the dependencies needed.
git clone https://github.com/BigGSSquare/fnol-project
cd fnol-project
npm install
1 --> Place a sample FNOL file in ./samples/Supported formats:

1. PDF with AcroForm fields or widget annotations
   2.Plain .txt (for testing basic flows)

2 -->Update the file path in index.js

inputPath = "./samples/your-fnol-document.pdf";
then type 

node index.js
(or 2 files filled partially already given ACORD-Automobile... and sample.txt. copy the relative path and paste in the mentioned field.)

### PROJECT DESCRIPTION

## Overview

This project implements a deterministic, schema-driven agent that:

- Extracts structured data from FNOL PDFs (primarily ACORD-style forms)
- Validates mandatory fields
- Classifies claims using transparent business rules
- Routes claims to appropriate workflows (fast-track, manual review, investigation, specialist queue)

## Why this matters

FNOL PDFs are deceptive:  
They look highly structured to humans, but are frequently:

- flattened (no live AcroForm fields)
- missing `/V` values despite visible text
- rendered via appearance streams only
- inconsistent across carriers, years, and export methods

Blindly trusting visual appearance or applying aggressive parsing often leads to **silent errors** and **misrouted claims**

## How it works

### 1. Extraction (conservative)

- Uses `pdf-lib` to read **real AcroForm fields** when present
- Falls back to widget annotation / appearance stream data **only as best-effort**
- Never performs layout analysis, text scraping, or OCR
- Maps found fields → internal FNOL schema using explicit name mapping

### 2. Validation

- Enforces a fixed business schema (policy number, insured, loss date, description, estimated damage, etc.)
- Tracks **missing mandatory fields** explicitly

### 3. Classification & Routing

Pure rule-based (no ML):

| Route              | Trigger condition example                                    | Typical next step             |
| ------------------ | ------------------------------------------------------------ | ----------------------------- |
| `FAST_TRACK`       | Low estimated damage + no missing fields + clean description | Auto-adjudication             |
| `MANUAL_REVIEW`    | Any missing mandatory field                                  | Human review queue            |
| `INVESTIGATION`    | Fraud indicators in description (selected keywords/patterns) | SIU / fraud team              |
| `SPECIALIST_QUEUE` | Injury, liability complexity, high severity indicators       | Adjuster / medical specialist |

Every decision includes human-readable `reasoning`.

### Output Format

```json
{
  "extractedFields": { … },          // only reliably extracted values
  "missingFields":   ["policyNumber", "lossDate"],
  "recommendedRoute": "MANUAL_REVIEW",
  "reasoning":       "Missing mandatory fields: policyNumber, lossDate"
}
Known Limitations (intentional)

No OCR → flattened/scanned PDFs usually route to manual review
No layout parsing → heavily visual / non-form PDFs extract very little
Appearance-stream values = best-effort only (not treated as authoritative)
Rule-based classification only (no LLM or ML at decision time)

These are trade-offs for correctness and defensibility, not bugs.
Future Improvement Ideas
(most remain optional / additive layers)

Optional OCR fallback for flattened documents
--Template-aware layout parsing (ACORD versioned templates)
--Table extraction (vehicles, injured parties, damages)
--Per-field provenance & confidence tagging.(confidence score and manual reviews accordingly)
LLM as secondary validator (inconsistency detection, explanation enhancement)
Integration with document classification front-end

Conclusion
This agent demonstrates a conservative yet production-minded approach to FNOL automation:
It automates the obvious, safely escalates the uncertain, and never pretends to know more than the document actually tells it.
Perfect for environments where explainability, compliance, and zero-trust data handling matter more than raw throughput.
```

##My Approach to the problem statment.

One of the most challenging problems I worked on was parsing FNOL (First Notice of Loss) PDF documents without using AI-based extraction, since token costs made AI solutions expensive at scale.

Initially, I approached it as a simple text extraction problem. I used a library called pdf-parse and built a rule-based parser to extract key-value pairs like policy number, insured name, and date of loss. My assumption was that the filled-in values would appear alongside the labels in the extracted text.

However, when testing, I realized my parser was only detecting the labels, not the actual user inputs. That forced me to step back and inspect how the PDF was structured internally instead of treating it like a plain text document.

After investigating the PDF structure, I discovered that many of the FNOL files were built using AcroForms. In these PDFs, the labels are part of the visible text layer, but the user-entered values are stored separately inside the document’s AcroForm dictionary, which is attached to the PDF catalog. That explained why text extraction alone wasn’t enough.

To address this, I changed my approach. I switched from pdf-parse to pdf-lib, which allows programmatic access to form fields. I iterated through the AcroForm fields, retrieved field names, and extracted their stored values. This worked for structured form-based PDFs and gave me measurable progress.

But during further testing, I found inconsistencies. Some PDFs were flattened (where form data was converted into static text), and some were scanned image-based documents with no text layer at all. Relying solely on AcroForm parsing was not reliable across all inputs.

At that point, I redesigned the solution into a layered parsing pipeline:

1. First, check if the PDF contains AcroForm fields and extract values directly.
2. If no usable form fields exist, attempt rule-based text parsing on the text layer.
3. If the document is scanned or lacks extractable text, apply OCR as a fallback.

This multi-step strategy improved reliability across different document formats while still avoiding unnecessary AI usage.

The key shift in my approach was moving from assuming a uniform document structure to designing a system that adapts based on the internal structure of each PDF. That experience taught me to inspect data formats deeply before building logic around them and to design systems defensively when handling real-world inputs.

