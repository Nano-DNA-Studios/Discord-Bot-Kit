import FileSearch from "../../../FileSearch";
import Command from "./Command";

/**
 * Command Factory for creating new Instances of a Command based off the Command Name provided
 */
class CommandFactory {
    /**
     * The name of the Command to be created
     */
    private _commandName: string;

    /**
     * Instance of the FileSearch
     */
    private _fileSearch: FileSearch;

    /**
     * Initializes the Command Factory
     * @param commandName The name of the command
     */
    constructor(commandName: string) {
        this._commandName = commandName;
        this._fileSearch = new FileSearch();
    }

    /**
     * Creates an Instance of the Command
     * @param CommandType The Class Type of the Command that will be created. Must have a constructor that takes a single parameter of the Command Interface
     * @returns A New Instance of the Command Requested
     */
    public CreateCommand<T extends Command>(): T | undefined {
        try {
            const Commands = this._fileSearch.GetAllCommands();
            for (const command of Commands) {
                const instance = new command();

                if (instance.CommandName === this._commandName)
                    return instance as T;
            }
        } catch (err) {
            console.log("Unable to scan directory: " + err);
        }
    }
}

export default CommandFactory;