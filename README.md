# Spectral API Versioning Ruleset

[![NPM Downloads](https://img.shields.io/npm/dw/@stoplight/spectral-api-versioning-ruleset?color=blue)](https://www.npmjs.com/package/@stoplight/spectral-api-versioning-ruleset) [![Stoplight Forest](https://img.shields.io/ecologi/trees/stoplightinc)][stoplight_forest]

Scan an [OpenAPI](https://spec.openapis.org/oas/v3.1.0) document to detect security issues. As OpenAPI is only describing the surface level of the API it cannot see what is happening in your code, but it can spot obvious issues and outdated standards being used.

## Installation

``` bash
npm install --save -D @stoplight/spectral-api-versioning-ruleset
npm install --save -D @stoplight/spectral-cli
```

## Usage


Create a local ruleset that extends the ruleset. In its most basic form this just tells Spectral what ruleset you want to use, but it will allow you to customise things, add your own rules, turn bits off if its causing trouble.

```
cd ~/src/<your-api>

echo 'extends: ["@stoplight/spectral-api-versioning-ruleset"]' > .spectral.yaml
```

_If you're using VS Code or Stoplight Studio then the NPM modules will not be available. Instead you can use the CDN hosted version:_

```
echo 'extends: ["https://unpkg.com/@stoplight/spectral-api-versioning-ruleset@1.0.0/dist/ruleset.js"]' > .spectral.yaml
```

_**Note:** You need to use the full URL with CDN hosted rulesets because Spectral [cannot follow redirects through extends](https://github.com/stoplightio/spectral/issues/2266)._

Next, use Spectral CLI to lint against your OpenAPI description. Don't have any OpenAPI? [Record some HTTP traffic to make OpenAPI](https://apisyouwonthate.com/blog/creating-openapi-from-http-traffic) and then you can switch to API Design-First going forwards.

```
spectral lint api/openapi.yaml
```

You should see some output like this:

```
/Users/phil/src/protect-earth-api/api/openapi.yaml
  44:17      warning  owasp:api3:2019-define-error-responses-400:400 response should be defined.. Missing responses[400]  paths./upload.post.responses
```

Now you have some things to work on for your API. Thankfully these are only at the `warning` and `information` severity, and that is not going to [fail continuous integration](https://meta.stoplight.io/docs/spectral/ZG9jOjExNTMyOTAx-continuous-integration) (unless [you want them to](https://meta.stoplight.io/docs/spectral/ZG9jOjI1MTg1-spectral-cli#error-results)).

There are [a bunch of other rulesets](https://github.com/stoplightio/spectral-rulesets) you can use, or use for inspiration for your own rulesets and API Style Guides.

## 🎉 Thanks

- [Alex Savage](https://github.com/savage-alex) - Created `no-path-versioning` which is a fantasticly simple solution to avoid so many problems.

## 📜 License

This repository is licensed under the MIT license.

## 🌲 Sponsor 

If you would like to thank us for creating Spectral, we ask that you [**buy the world a tree**][stoplight_forest].

[stoplight_forest]: https://ecologi.com/stoplightinc
