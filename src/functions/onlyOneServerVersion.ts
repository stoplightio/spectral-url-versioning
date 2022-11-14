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

  const versionsMatches = targetVal.map(({ url }: any) => url.match(/([\\.|\\/|](v|version)?[0-9]{1,3}(?:\/)?)/i)[0]);

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
