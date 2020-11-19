
class GenericBuilder {
    // back -> db
    parse = (object) => {
        const newObject = Object.fromEntries( Object.entries(object).map((it) => [this.dictionary.find((dict) => dict[0] == it[0])[1],it[1]]) );
        return newObject;
    }

    // db -> back
    unparse = (object) => {
        const newObject = Object.fromEntries( Object.entries(object).map((it) => [this.dictionary.find((dict) => dict[1] == it[0])[0],it[1]]) );
        return newObject;
    }
}

module.exports = GenericBuilder