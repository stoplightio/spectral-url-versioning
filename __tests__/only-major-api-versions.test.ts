import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./__helpers__/helper";

testRule("only-major-api-versions", [
	{
		name: "valid case: major is ok",
		document: {
			openapi: "3.1.0",
			info: { version: "1.0" },
			servers: [
        {
          url: 'https://api.example.org/v1'
        },
      ],
		},
		errors: [],
	},

	{
		name: "invalid case: minor is unnecessary",
		document: {
			openapi: "3.1.0",
			info: { version: "1.0" },
			servers: [
        {
          url: 'https://api.example.org/v1.2'
        },
      ],
		},
    errors: [
      {
        message: "Version numbers SHOULD contain major only, no minor or patch.",
        path: ["servers", "0", "url"],
        severity: DiagnosticSeverity.Warning,
      },
    ],
	},

  {
    name: "invalid case: patch is massively wasteful",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      servers: [
        {
          url: 'https://api.example.org/v1.2.3'
        },
      ],
    },
    errors: [
      {
        message: "Version numbers SHOULD contain major only, no minor or patch.",
        path: ["servers", "0", "url"],
        severity: DiagnosticSeverity.Warning,
      },
    ],
	},

  {
    name: "invalid case: subdomain versions too",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      servers: [
        {
          url: 'https://v1.2.3.example.org/'
        },
      ],
    },
    errors: [
      {
        message: "Version numbers SHOULD contain major only, no minor or patch.",
        path: ["servers", "0", "url"],
        severity: DiagnosticSeverity.Warning,
      },
    ],
	},
]);
