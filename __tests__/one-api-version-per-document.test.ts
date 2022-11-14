import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./__helpers__/helper";

testRule("one-api-version-per-document", [
	{
		name: "valid case: different environments same version",
		document: {
			openapi: "3.1.0",
			info: { version: "1.0" },
			servers: [
        {
          url: 'https://dev.example.org/v1'
        },
        {
          url: 'https://prod.example.org/v1'
        },
      ],
		},
		errors: [],
	},

	{
		name: "valid case: weird versions but they're the same",
		document: {
			openapi: "3.1.0",
			info: { version: "1.0" },
			servers: [
        {
          url: 'https://dev.example.org/version123.56'
        },
        {
          url: 'https://prod.example.org/version123.56'
        },
      ],
		},
		errors: [],
	},

	{
		name: "valid case: port numbers are ok",
		document: {
			openapi: "3.1.0",
			info: { version: "1.0" },
			servers: [
        {
          url: 'https://dev.example.org:3000/version123'
        },
        {
          url: 'https://prod.example.org/version123'
        },
      ],
		},
		errors: [],
	},

  {
    name: "valid case: no versions",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      servers: [
        {
          url: "https://dev.example.org",
        },
        {
          url: "https://prod.example.org",
        },
      ],
    },
    errors: [],
  },

  {
    name: "valid case: no servers defined",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
    },
    errors: [],
  },
  
  {
    name: "valid case: empty servers defined",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      servers: [],
    },
    errors: [],
  },
  
  {
    name: "valid case: weird servers defined",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      servers: {},
    },
    errors: [],
  },

	{
		name: "invalid: multiple versions in directory",
		document: {
			openapi: "3.1.0",
			info: { version: "1.0" },
			servers: [
        {
          url: 'https://example.org/v1',
        },
        {
          url: 'https://example.org/v2',
        },
      ],
    },
		errors: [
			{
				message: "Multiple API versions detected in Server URLs.",
				path: ["servers"],
				severity: DiagnosticSeverity.Error,
			},
		],
  },

  {
    name: "invalid: multiple versions in subdir",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      servers: [
        {
          url: 'https://v1.example.org/',
        },
        {
          url: 'https://v2.example.org/',
        },
      ],
    },
    errors: [
      {
        message: "Multiple API versions detected in Server URLs.",
        path: ["servers"],
        severity: DiagnosticSeverity.Error,
      },
    ],
	},

  {
    name: "invalid: multiple versions in middle subdir",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      servers: [
        {
          url: 'https://api.v1.example.org/',
        },
        {
          url: 'https://api.v2.example.org/',
        },
      ],
    },
    errors: [
      {
        message: "Multiple API versions detected in Server URLs.",
        path: ["servers"],
        severity: DiagnosticSeverity.Error,
      },
    ],
	},

  {
    name: "invalid: multiple weird versions",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      servers: [
        {
          url: 'https://12345.example.org/',
        },
        {
          url: 'https://example.org/v23456',
        },
      ],
    },
    errors: [
      {
        message: "Multiple API versions detected in Server URLs.",
        path: ["servers"],
        severity: DiagnosticSeverity.Error,
      },
    ],
	},
]);
