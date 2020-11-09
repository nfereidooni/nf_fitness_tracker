const db = require( './models' );

// input: imageId
// action: fetches a single image with the imageId
// output: { imageId, title, imageUrl, tags, createdAt } || false
async function load( imageId ){
    const imageData = await db.images.findOne({_id: imageId});
    if( !imageData ) {
        return false;
    }

    /* return consistent format data */
    return {
        imageId: imageData._id,
        title: imageData.title,
        imageUrl: imageData.imageUrl,
        tags: imageData.tags,
        createdAt: imageData.createdAt
    };
}

// input: <object> { userId, title, imageUrl, tags }
// output: imageId on success, false otherwise
async function save( imageData ){
    const dbData = {
        userId: imageData.userId,
        title: imageData.title,
        imageUrl: imageData.imageUrl,
        tags: imageData.tags
    };
    const dbResult = await db.images.create(dbData);
    return dbResult._id ? dbResult._id : false;
}

// input: imageId, <object> { title, imageUrl, tags }
// note we DO NOT want to adjust the userId, nor forget it.
// output: imageId on success or false
async function update( imageId, imageData ){
    // console.log(`[updateImage] imageId(${imageId}) myEdit: `, myData);
    const dbData = {
        title: imageData.title,
        imageUrl: imageData.imageUrl,
        tags: imageData.tags
    };
    const dbResult = await db.images.findOneAndUpdate({_id: imageId}, dbData, {new: true});
    return dbResult._id ? dbResult._id : false;
}

// input: { imageId }
// output: boolean on success
async function remove( imageId ){
    const dbResult = await db.images.findByIdAndDelete(imageId);
    return dbResult._id ? true : false;
}

// input : <object> { userId | tag | imageId }
// output: <array> [{imageId, name, imageUrl, tags, creationTime, isFavourite }]
async function list( search={} ){
    // determine search query based on the search
    let imageList = [];
    if( search.userId ){
        imageList = await db.images.find({ userId: search.userId }).sort({ createdAt: -1 });
    } else if( search.imageId ){
        const imageData = await db.images.findOne({_id: search.imageId});
        imageList.push( imageData );
    } else if( search.tag ){
        imageList = await db.images.find().$where(`this.tags.indexOf('${tag}') > -1`);
    } else {
        imageList = await db.images.find();
    }
    console.log( 'imageList: ', imageList );
    if( imageList.length===0 ) {
        return false;
    }

    // now clean up the list and return relevant data in camelCase
    let outputList = [];
    imageList.forEach( function( item ){
        outputList.push({
            imageId: item._id,
            userId: item.userId,
            title: item.title,
            imageUrl: item.imageUrl,
            tags: item.tags,
            createdAt: item.createdAt,
        });
    });
    return outputList;
}

module.exports = {
    load, save, update, remove, list
};