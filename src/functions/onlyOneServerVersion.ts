import { createRulesetFunction } from '@stoplight/spectral-core';

// export default createRulesetFunction({
//   input: null,
//   options: null,
// }, function onlyOneServerVersion (input: any): IFunctionResult[] {

//   // const errorList = [];
//   const { servers } = input;


//     // errorList.push({
//     //   message: `versions`,
//     //   path: ["$.servers"]
//     // });


//   return [];
// });






/**
 * @author Jane Smith <jsmith@example.com>
 */
export default createRulesetFunction({
  input: null,
  options: {
    type: ['null'],
  },
}, (targetVal: any) => {

  const versionsMatches = targetVal.map(({ url }: any) => url.match(/((?:\/)(v|version)?[0-9]{1,3}(?:\/)?)/i)[0]);

  // If there are fewer than two versions mentioned there cannot be multiple versions
  if (versionsMatches < 2) {
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
