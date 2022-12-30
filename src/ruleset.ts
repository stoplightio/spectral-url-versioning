import { pattern } from "@stoplight/spectral-functions";
import { oas2, oas3 } from "@stoplight/spectral-formats";
import { DiagnosticSeverity } from "@stoplight/types";

import onlyOneServerVersion from "./functions/onlyOneServerVersion";

export default {
  rules: {
    /**
     * @author: Phil Sturgeon <https://github.com/philsturgeon>
     */
    "one-api-version-per-document": {
      message: "Multiple API versions detected in Server URLs. {{message}}",
      description:
        "Mixing multiple global API versions into a single description document can only lead to confusion. Instead of trying to describe multiple APIs together in a single document, split them into multiple APIs so no accidental changes can leak between different versions.",
      severity: DiagnosticSeverity.Error,
      given: "$.servers",
      formats: [oas3],
      then: {
        function: onlyOneServerVersion,
      },
    },

    /**
     * @author: Phil Sturgeon <https://github.com/philsturgeon>
     */
    "only-major-api-versions": {
      message: "Version numbers SHOULD contain major only, no minor or patch.",
      description:
        "Using semver-like versions for an API are almost never necessary, because breaking changes could only happen on a major version, and non-breaking changes don't matter. The entire concept is invalidated by API evolution means that a minor version can be deployed that adds new functionality, and that should not break anything. If you have a patch, getting that patched version out to clients immediately means fewer production issues, and you don't want to wait for them to redeploy the client application to use the new server URL.",
      severity: DiagnosticSeverity.Warning,
      given: "$.servers..url",
      formats: [oas3],
      then: {
        function: pattern,
        functionOptions: {
          notMatch: "/[\\.|\\/|](v|version)?[0-9]+\\.[0-9]+/i",
        },
      },
    },

    /**
     * @author: Alex Savage <https://github.com/savage-alex>
     */
    "no-path-versioning": {
      message:
        "{{path}} contains a version number. API paths SHOULD NOT have versioning in the path. It SHOULD be in the server URL instead.",
      description:
        "Versioning in the path can lead to confusion that is best avoided. Perhaps multiple global versions are in the same document, but they ref shared schemas which change over time and break backwards compatibility unintentionally. Perhaps people are trying to implement method-level URL versioning which SHOULD NOT be used.",
      severity: DiagnosticSeverity.Warning,
      given: "$.paths[*]~",
      formats: [oas2, oas3],
      then: {
        function: pattern,
        functionOptions: {
          notMatch: "/((?:/)(v|version)?[0-9]{1,3}(?:/)?)/i",
        },
      },
    },
  },
};
