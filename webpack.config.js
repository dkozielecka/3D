module.exports = {
    entry: ["./src/main.js"],
    output: {
        path: "/Users/dkozielecka/Front/3D/build",
        filename: "bundle.js"
    },

    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000
    }
};
