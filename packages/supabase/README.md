# Supabase Integration Guide for Data Anonymization

## Overview
This module handles data storage and retrieval via Supabase. Ensure that all data is anonymized before storage and properly handled upon retrieval.

## Instructions
- **Anonymization Before Storage:** Use the anonymization functions from `/packages/utils/anonymization.ts` to process data before it is stored in Supabase. This includes any PII or sensitive data that needs to be protected.
  
- **Secure Data Retrieval:** When retrieving data, apply any necessary de-anonymization only if required for specific analysis tasks. Maintain the highest level of data privacy and security.

- **Regulatory Compliance:** Ensure that the anonymization process complies with GDPR, HIPAA, and other relevant data privacy regulations.

- **Documentation and Logging:** Log anonymization processes where necessary, but ensure that no sensitive data is exposed in logs.