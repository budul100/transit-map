# transit-map

Generate a schematic map (“metro map”) for a given (transit) network graph using a Mixed Integer Programming approach. Part of the [*Generating Transit Maps*](https://github.com/public-transport/generating-transit-maps) project.

**This fork is is based on the great [Transit Map project of juliuste](https://github.com/juliuste/transit-map). But the solver in this solution is the open [CBC](https://www.coin-or.org/) solver. Therefore, the commercial Gurobi solver is not needed anymore.**

[![license](https://img.shields.io/github/license/juliuste/transit-map.svg?style=flat)](license)

* [Installation & Requirements](#installation--requirements)
* [Usage](#usage)
* [Examples](#examples)

## Installation & Requirements

What you need:

- [`node.js`](http://nodejs.org/) 8.0 or higher installed
- [`cbc.exe`](https://www.coin-or.org/download/binary/CoinAll/) 1.6 or higher. This file needs to be located in the folder of the 'cli.js'.

## Usage

### CLI

You need a JSON graph representation of your transit network that looks like [this example](examples/bvg.input.json) for the Berlin Metro (U-Bahn). You can then generate a transit map for the given graph by running:

```sh
cat graph.json | node.exe cli.js > output.svg
```

For further information on several CLI options/params, run:

```sh
node.exe cli.js --help
```

## Examples

### 🇩🇪 Berlin (Metro)

#### Input

![Berlin metro network](examples/bvg.input.svg)

#### Output

![Berlin metro map](examples/bvg.output.svg)

Using [this](examples/bvg.input.json) input graph. Running time ≈40sec.

### 🇦🇹 Vienna (Metro)

#### Input

![Vienna metro network](examples/wien.input.svg)

#### Output

![Vienna metro map](examples/wien.output.svg)

Using [this](examples/wien.input.json) input graph. Running time ≈20sec.

### 🇸🇪 Stockholm (Metro)

#### Input

![Stockholm metro network](examples/stockholm.input.svg)

#### Output

![Stockholm metro map](examples/stockholm.output.svg)

Using [this](examples/stockholm.input.json) input graph. Running time ≈20sec.

### 🇵🇹 Lisbon (Metro)

#### Input

![Lisbon metro network](examples/lisboa.input.svg)

#### Output

![Lisbon metro map](examples/lisboa.output.svg)

Using [this](examples/lisboa.input.json) input graph. Running time ≈15sec.

### 🇫🇷 Nantes (Tram)

#### Input

![Nantes metro network](examples/nantes.input.svg)

#### Output

![Nantes metro map](examples/nantes.output.svg)

Using [this](examples/nantes.input.json) input graph. Running time ≈15sec.

### 🇫🇷 Montpellier (Tram)

#### Input

![Montpellier tram network](examples/montpellier.input.svg)

#### Output

![Montpellier tram map](examples/montpellier.output.svg)

Using [this](examples/montpellier.input.json) input graph. Running time ≈20sec.