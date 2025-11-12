import React from 'react';
import Banner from '../Banner/Banner';
import AllModels from '../Page/AllModel/AllModel';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AllModels></AllModels>
        </div>

    

    // // ---------- Get Single Model (Details Page) ----------
    // app.get("/models/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const { ObjectId } = require("mongodb");
    //   const model = await modelCollection.findOne({ _id: new ObjectId(id) });
    //   res.send(model);
    // });

    // // ---------- Delete Model ----------
    // app.delete("/models/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const { ObjectId } = require("mongodb");
    //   const result = await modelCollection.deleteOne({ _id: new ObjectId(id) });
    //   res.send(result);
    // });

    // // ---------- Update Model ----------
    // app.put("/models/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const updatedData = req.body;
    //   const { ObjectId } = require("mongodb");
    //   const result = await modelCollection.updateOne(
    //     { _id: new ObjectId(id) },
    //     { $set: updatedData }
    //   );
    //   res.send(result);
    // });
    );
};

export default Home;