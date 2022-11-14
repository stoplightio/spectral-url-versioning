import { createRulesetFunction } from '@stoplight/spectral-core';

/**
 * @author Phil Sturgeon <https://github.com/philsturgeon>
 */
export default createRulesetFunction({
  input: null,
  options: {
    type: ['null'],
  },
}, (targetVal: Array<any>) => {

  if (! Array.isArray(targetVal)) {
    return [];
  }

  // Map through all the servers and see if they have versions, and if they do push them into a list
  const versionsMatches = targetVal.reduce((result, { url }: any) => {
    const matches = url.match(/([\\.|\\/|](v|version)?[0-9]{1,3}(?:\/)?)/i);
    if (matches) {
      result.push(matches[0]);
    }
    return result;
  }, []);

  // No versions, thats easy.
  if (versionsMatches === null || typeof versionsMatches === 'undefined') {
    return [];
  }

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
