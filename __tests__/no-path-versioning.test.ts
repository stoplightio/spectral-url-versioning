import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./__helpers__/helper";

testRule("no-path-versioning", [
	{
		name: "valid case",
		document: {
			openapi: "3.1.0",
			info: { version: "1.0" },
			paths: {
				"/foo/{id}": {
					get: {
					},
				},
			},
		},
		errors: [],
	},

	{
		name: "invalid if its an integer",
		document: {
			openapi: "3.1.0",
			info: { version: "1.0" },
			paths: {
				'/v1': {},
        '/v1/foobar': {},
        '/v1.2/foobar': {},
        '/v1.2.3/foobar': {},
        '/1.0/foobar': {},
        '/2/foobar': {},
        '/3.0.12123141143998836748/foobar': {},
        '/version1/foobar': {},
        '/notthis': {},
        '/12345': {},
				'/api/prefix/v1': {},
        '/api/prefix/v1/foobar': {},
        '/api/prefix/v1.2/foobar': {},
        '/api/prefix/v1.2.3/foobar': {},
        '/api/prefix/1.0/foobar': {},
        '/api/prefix/2/foobar': {},
        '/api/prefix/3.0.12123141143998836748/foobar': {},
        '/api/prefix/version1/foobar': {},
        '/api/prefix/notthis': {},
        '/api/prefix/12345': {},
			},
		},
		errors: [
			{
				message: "#/paths/~1v1 contains a version number. API paths SHOULD NOT have versioning in the path. It SHOULD be in the server URL instead.",
				path: ["paths", "/v1"],
				severity: DiagnosticSeverity.Error,
			},
			{
				message: "#/paths/~1v1~1foobar contains a version number. API paths SHOULD NOT have versioning in the path. It SHOULD be in the server URL instead.",
				path: ["paths", "/v1/foobar"],
				severity: DiagnosticSeverity.Error,
			},
			{
				message: "#/paths/~1v1.2~1foobar contains a version number. API paths SHOULD NOT have versioning in the path. It SHOULD be in the server URL instead.",
				path: ["paths", "/v1.2/foobar"],
				severity: DiagnosticSeverity.Error,
			},
			{
				message: "#/paths/~1v1.2.3~1foobar contains a version number. API paths SHOULD NOT have versioning in the path. It SHOULD be in the server URL instead.",
				path: ["paths", "/v1.2.3/foobar"],
				severity: DiagnosticSeverity.Error,
			},
			{
				message: "#/paths/~11.0~1foobar contains a version number. API paths SHOULD NOT have versioning in the path. It SHOULD be in the server URL instead.",
				path: ["paths", "/1.0/foobar"],
				severity: DiagnosticSeverity.Error,
			},
			{
				message: "#/paths/~12~1foobar contains a version number. API paths SHOULD NOT have versioning in the path. It SHOULD be in the server URL instead.",
				path: ["paths", "/2/foobar"],
				severity: DiagnosticSeverity.Error,
			},
			{
				message: "#/paths/~13.0.12123141143998836748~1foobar contains a version number. API paths SHOULD NOT have versioning in the path. It SHOULD be in the server URL instead.",
				path: ["paths", "/3.0.12123141143998836748/foobar"],
				severity: DiagnosticSeverity.Error,
			},
			{
				message: "#/paths/~1version1~1foobar contains a version number. API paths SHOULD NOT have versioning in the path. It SHOULD be in the server URL instead.",
				path: ["paths", "/version1/foobar"],
				severity: DiagnosticSeverity.Error,
			},
			{
				message: "#/paths/~112345 contains a version number. API paths SHOULD NOT have versioning in the path. It SHOULD be in the server URL instead.",
				path: ["paths", "/12345"],
				severity: DiagnosticSeverity.Error,
			},
      {
				message: "#/paths/~1api~1prefix~1v1 contains a version number. API paths SHOULD NOT have versioning in the path. It SHOULD be in the server URL instead.",
				path: ["paths", "/api/prefix/v1"],
				severity: DiagnosticSeverity.Error,
			},
			{
				message: "#/paths/~1api~1prefix~1v1~1foobar contains a version number. API paths SHOULD NOT have versioning in the path. It SHOULD be in the server URL instead.",
				path: ["paths", "/api/prefix/v1/foobar"],
				severity: DiagnosticSeverity.Error,
			},
			{
				message: "#/paths/~1api~1prefix~1v1.2~1foobar contains a version number. API paths SHOULD NOT have versioning in the path. It SHOULD be in the server URL instead.",
				path: ["paths", "/api/prefix/v1.2/foobar"],
				severity: DiagnosticSeverity.Error,
			},
			{
				message: "#/paths/~1api~1prefix~1v1.2.3~1foobar contains a version number. API paths SHOULD NOT have versioning in the path. It SHOULD be in the server URL instead.",
				path: ["paths", "/api/prefix/v1.2.3/foobar"],
				severity: DiagnosticSeverity.Error,
			},
			{
				message: "#/paths/~1api~1prefix~11.0~1foobar contains a version number. API paths SHOULD NOT have versioning in the path. It SHOULD be in the server URL instead.",
				path: ["paths", "/api/prefix/1.0/foobar"],
				severity: DiagnosticSeverity.Error,
			},
			{
				message: "#/paths/~1api~1prefix~12~1foobar contains a version number. API paths SHOULD NOT have versioning in the path. It SHOULD be in the server URL instead.",
				path: ["paths", "/api/prefix/2/foobar"],
				severity: DiagnosticSeverity.Error,
			},
			{
				message: "#/paths/~1api~1prefix~13.0.12123141143998836748~1foobar contains a version number. API paths SHOULD NOT have versioning in the path. It SHOULD be in the server URL instead.",
				path: ["paths", "/api/prefix/3.0.12123141143998836748/foobar"],
				severity: DiagnosticSeverity.Error,
			},
			{
				message: "#/paths/~1api~1prefix~1version1~1foobar contains a version number. API paths SHOULD NOT have versioning in the path. It SHOULD be in the server URL instead.",
				path: ["paths", "/api/prefix/version1/foobar"],
				severity: DiagnosticSeverity.Error,
			},
			{
				message: "#/paths/~1api~1prefix~112345 contains a version number. API paths SHOULD NOT have versioning in the path. It SHOULD be in the server URL instead.",
				path: ["paths", "/api/prefix/12345"],
				severity: DiagnosticSeverity.Error,
			},
		],
	},
]);
