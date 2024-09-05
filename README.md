# CSV to JSON Converter

This script converts CSV files to JSON format.

## Usage

To use the CSV to JSON converter, run the script with the following command:

```bash
csv-to-json --csvDir=<path/to/csv/files> --objName=<name/of/the/object/key> [--jsonDir=<path/to/output/json/files>] [--columns=<comma/separated/list/of/columns>]
```

Example:

```bash
csv-to-json --csvDir=./test --objName=Key --columns=en,ja,fr
```

## Arguments

| Argument    | Description                                | Default          | Required/Optional |
| ----------- | ------------------------------------------ | ---------------- | ----------------- |
| `--csvDir`  | Directory containing CSV files             | -                | Required          |
| `--objName` | Name of the object/key in CSV              | -                | Required          |
| `--jsonDir` | Output directory for JSON files            | Same as `csvDir` | Optional          |
| `--columns` | Comma-separated list of columns to include | -                | Optional          |

## Functionality

1. Reads CSV files from the specified directory
2. Parses each CSV file, converting it to a JSON structure
3. Optionally filters columns based on the `--columns` argument
4. Saves each converted file as a JSON in the output directory

## Output

The script generates JSON files with the following structure:

```json
{
  "name": "<fileName>",
  "items": {
    "<key1>": {
      "<property1>": "<value1>",
      "<property2>": "<value2>",
      "<property3>": "<value3>"
    },
    "<key2>": {
      "<property1>": "<value1>",
      "<property2>": "<value2>",
      "<property3>": "<value3>"
    }
  }
}
```
