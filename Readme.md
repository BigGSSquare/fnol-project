# Autonomous FNOL Processing Agent

## Overview

This project explores the design of a lightweight autonomous agent for processing First Notice of Loss (FNOL) documents. The objective is to extract key claim-related fields, detect missing or inconsistent information, and route insurance claims to the appropriate workflow using deterministic business rules.

The emphasis of this project is on **correctness, explainability, and defensive automation**, rather than maximum extraction coverage. Particular focus is placed on the structural realities of real-world insurance PDFs.

---

## FNOL Documents and Structural Constraints

FNOL documents are typically presented as structured forms to human users. However, from a programmatic perspective, these documents are often **semi-structured** or **layout-driven**, rather than semantically encoded.

Many FNOL documents follow the ACORD standard. While ACORD forms are visually consistent, their internal PDF representation frequently prioritizes **page layout and rendering** over machine-readable structure. As a result:

- Field labels are commonly encoded as static page text
- User-entered values may not be stored as extractable text objects
- Some documents contain interactive form fields, while others do not

This mismatch between visual structure and underlying data representation is the primary technical challenge addressed by this project.

---

## AcroForms and the PDF Object Model

The PDF specification optionally allows documents to define an **AcroForm**, which represents a collection of interactive form fields and their associated values.

At a high level, a PDF document consists of multiple independent components:

- **Page Content Streams** — rendering instructions for text and graphics
- **Widget Annotations** — visual representations of form fields placed on pages
- **AcroForm Dictionary** — the document-level structure that defines form fields and stores their values

Form field values, when present, are stored in the AcroForm field objects (typically under the `/V` entry) and are **not part of the page content streams**.

Because these components are independent, a document may visually display filled-in values even when the underlying AcroForm field values are empty or absent.

---

## Appearance Streams and Flattened Forms

A common source of confusion arises from **appearance streams** associated with widget annotations. Appearance streams control how a field’s value is rendered visually on the page.

In many real-world FNOL PDFs, especially ACORD forms, values are rendered into appearance streams without being stored in the corresponding AcroForm field value entry. This commonly occurs when forms are flattened or exported after completion.

In such cases:

- The document appears filled to a human reader
- The AcroForm field exists but contains no value
- No reliable structured data is available for extraction

This behavior is inherent to the PDF format and cannot be resolved through text extraction alone.

---

## AcroForm Detection as a Hard Decision Boundary

Before attempting any field extraction, the agent inspects the PDF document catalog to determine whether an AcroForm dictionary is present.

The presence of an AcroForm reliably indicates that structured form fields may exist and that extraction from the form data layer is possible. Conversely, the absence of an AcroForm indicates that no authoritative form data layer exists.

This check acts as a **hard decision boundary**:
- If an AcroForm is present, the agent attempts structured field extraction
- If no AcroForm is present, the agent does not attempt to infer or reconstruct field values

This approach avoids unreliable heuristics and prevents the system from hallucinating data.

---

## Limitations of Text-Based PDF Extraction

Traditional PDF text extraction libraries operate exclusively on page content streams. They are effective at extracting labels, headings, and static text that are explicitly rendered on the page.

However, AcroForm field values are stored outside of page content streams and are therefore invisible to text-based extraction tools. Consequently, the absence of extracted values does not necessarily imply missing user input; it may simply reflect the document’s internal structure.

---

## Design Principles

Given the structural variability of FNOL PDFs, the system follows a defensive design approach:

- Prefer authoritative form data over inferred values
- Avoid guessing or reconstructing missing information
- Treat the FNOL business schema as the source of truth.
- Route ambiguous or incomplete cases to manual review

Subsequent sections describe the concrete implementation and routing logic built on top of these principles.
