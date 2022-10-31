import { pattern } from "@stoplight/spectral-functions";
import { oas2, oas3 } from "@stoplight/spectral-formats";
import { DiagnosticSeverity } from "@stoplight/types";

import onlyOneServerVersion from "./functions/onlyOneServerVersion";

export default {
  rules: {
    
    /**
     * @author: Phil Sturgeon <https://github.com/philsturgeon>
     */
    'one-api-version-per-document': {
      message: "Multiple API versions detected in Server URLs. {{message}}",
      description: "Mixing multiple global API versions into a single description document can only lead to confusion. Instead of trying to describe multiple APIs together in a single document, split them into multiple APIs so no accidental changes can leak between different versions.",
      severity: DiagnosticSeverity.Error,
      given: "$.servers",
      formats: [oas3],
      then: {
        function: onlyOneServerVersion
      }
    },

    /**
     * @author: Alex Savage <https://github.com/savage-alex>
     */
    'no-path-versioning': {
      message: "{{path}} contains a version number. API paths SHOULD NOT have versioning in the path. It SHOULD be in the server URL instead.",
      description: "Versioning in the path can lead to confusion that is best avoided. Perhaps multiple global versions are in the same document, but they ref shared schemas which change over time and break backwards compatibility unintentionally. Perhaps people are trying to implement method-level URL versioning which SHOULD NOT be used.",
      severity: DiagnosticSeverity.Warning,
      given: "$.paths[*]~",
      formats: [oas2, oas3],
      then: {
        function: pattern,
        functionOptions: {
          notMatch: '/((?:\/)(v|version)?[0-9]{1,3}(?:\/)?)/i'
        }
      }
    },

  },
};
