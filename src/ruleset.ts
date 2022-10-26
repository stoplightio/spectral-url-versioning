import { pattern } from "@stoplight/spectral-functions";
// import { oas2, oas3 } from "@stoplight/spectral-formats";
import { DiagnosticSeverity } from "@stoplight/types";

export default {
  rules: {
    /**
     * API1:2019 - Broken Object Level Authorization
     *
     * Use case
     * - ❌ API call parameters use the ID of the resource accessed through the API /api/shop1/financial_info.
     * - ❌ Attackers replace the IDs of their resources with a different one which they guessed through /api/shop2/financial_info.
     * - ❌ The API does not check permissions and lets the call through.
     * - ✅ Problem is aggravated if IDs can be enumerated /api/123/financial_info.
     *
     * How to prevent
     * - ❌ Implement authorization checks with user policies and hierarchy.
     * - ❌ Do not rely on IDs that the client sends. Use IDs stored in the session object instead.
     * - ❌ Check authorization for each client request to access database.
     * - ✅ Use random IDs that cannot be guessed (UUIDs).
     */

    /**
     * @author: Alex Savage <https://github.com/savage-alex>
     */
    'no-path-versioning': {
      message: "{{path}} contains a version number. API paths SHOULD NOT have versioning in the path. It SHOULD be in the server URL instead.",
      description: "Versioning in the path can lead to confusion that is best avoided. Perhaps multiple global versions are in the same document, but they ref shared schemas which change over time and break backwards compatibility unintentionally. Perhaps people are trying to implement method-level URL versioning which SHOULD NOT be used.",
      severity: DiagnosticSeverity.Warning,
      given: "$.paths[*]~",
      then: {
        function: pattern,
        functionOptions: {
          notMatch: '/((?:\/)(v|version)?[0-9]{1,3}(?:\/)?)/i'
        }
      }
    },

  },
};
