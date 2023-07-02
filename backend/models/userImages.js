let postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
        },
    }
);

module.exports= mongoose.model("Image", postSchema);