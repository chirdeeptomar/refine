#!/usr/bin/env node
import { Command } from "commander";
import execa from "execa";
import { readFileSync } from "fs";

const bootstrap = () => {
    const packageJson = JSON.parse(
        readFileSync(`${__dirname}/../package.json`, "utf8"),
    );

    const program = new Command();
    program
        .version(
            packageJson.version,
            "-v, --version",
            "Output the current version.",
        )
        .usage("<command> [options]")
        .helpOption("-h, --help", "Output usage information.")
        .allowUnknownOption(true)
        .allowExcessArguments(true)
        .action((_, command: Command) => {
            const superplateExecutable = require.resolve(".bin/superplate");
            try {
                execa.sync(
                    superplateExecutable,
                    [...command.args, "--project=refine"],
                    {
                        stdio: "inherit",
                    },
                );
            } catch (err) {}
        });

    program.parse(process.argv);

    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
};

bootstrap();
