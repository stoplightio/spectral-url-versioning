import { createRulesetFunction } from '@stoplight/spectral-core';

const VERSION_REGEXP = /^(?:v|version)?([0-9]+)$/i;

function extractVersion(input: string) {
  const value = VERSION_REGEXP.exec(input);
  if (value !== null) {
    return value[1];
  }

  return;
}

function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

/**
 * @author Phil Sturgeon <https://github.com/philsturgeon>
 */
export default createRulesetFunction<{ url: string }[], null>({
  input: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          format: 'url',
        }
      },
      required: ['url'],
    }
  },
  options: null,
}, (targetVal) => {

  // Map through all the servers and see if they have versions, and if they do push them into a list
  const versionsMatches = targetVal.reduce<string[]>((result, { url}) => {
    const parsedUrl = new URL(url);
    const versions = [
      ...parsedUrl.host.split('.'),
      ...parsedUrl.pathname.split('/'),
    ].map(extractVersion);

    result.push(...versions.filter(isNonNullable));

    return result;
  }, []);

  // If there are fewer than two versions mentioned there cannot be multiple versions
  if (versionsMatches.length < 2) {
    return [];
  }
  
  // IF all the versions match then thats also ok
  if (versionsMatches.every((version: string) => version === versionsMatches[0])) {
    return [];
  }
  
  // Looks like there's a few different versions in this file. Booo.
  return [
    {
      message: `The following API versions were detected mixed up together: ${versionsMatches}.`,
    }
  ];
});
