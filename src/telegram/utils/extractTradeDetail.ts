import { TradeDetails } from 'src/telegram/types/types';

export const extractTradeDetailFromGPTResponse = (rawMessage: string) => {
  // Regular expression to match text between copixStart and copixEnd
  const regex = /copixStart\d+(.*?)copixEnd\d+/gs;
  // Find all matches in the rawMessage
  const matches = rawMessage.match(regex);

  // Debug: Log the matches found by the regex
  console.log('Matches found:', matches);

  // If no matches are found, return an empty array
  if (!matches) {
    console.log('No matches found.');
    return [];
  }

  // Array to hold the parsed TradeDetails objects
  const objects: TradeDetails[] = matches
    .map((match) => {
      // Remove the copixStart and copixEnd markers from the match
      const objStr = match.replace(/(copixStart\d+)|(copixEnd\d+)/g, '').trim();

      // Debug: Log the string to be parsed into JSON
      console.log('Object string to parse:', objStr);

      // Parse the JSON string into a TradeDetails object
      try {
        const parsedObject = JSON.parse(objStr) as TradeDetails;

        // Debug: Log the successfully parsed object
        console.log('Parsed object:', parsedObject);

        return parsedObject;
      } catch (error) {
        // Debug: Log the error if JSON parsing fails
        console.error('Error parsing JSON:', error, 'for string:', objStr);
        return null; // or handle the error as needed
      }
    })
    .filter(Boolean); // Filter out any null values resulting from parse errors

  // Debug: Log the final array of TradeDetails objects
  console.log('Final parsed objects array:', objects);

  return objects;
};
