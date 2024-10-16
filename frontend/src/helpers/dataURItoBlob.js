/* eslint-disable no-unused-vars */
export default function dataURItoBlob(dataURI){
    // console.log(dataURI)
    // convert base64/URI encoded data component to bainary data 
    var byteString;
    if(dataURI.split(",")[0].indexOf('base64')>=0)
        byteString = atob(dataURI.split(",")[1])
    else byteString = decodeURI(dataURI.split(",")[1])
    // separate out the mime file 
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0] 
    // console.log(mimeString)
    // // write the bytes of the string to typed array 
    var ia = new Uint8Array(byteString.length)
    // console.log(ia)
    for (var i = 0; i< byteString.length; i++){
        ia[i] = byteString.charCodeAt(i)
    }
    return new Blob([ia], {type:mimeString} )
} 


