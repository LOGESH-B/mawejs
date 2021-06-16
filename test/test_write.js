//*****************************************************************************
//*****************************************************************************
//
// Test directory scanning
//
//*****************************************************************************
//*****************************************************************************

require("./fakenv");
const fs = require("../src/storage/localfs");
const document = require("../src/document")

testwrite_2();
//testwatch();

async function testwrite_1() {
  const doc = await document.load("../local/Beltane.mawe");

  const head = doc.story.body.head;
  console.log(`${head.author}: ${head.title}`);    
  console.log(doc.basename, doc.suffix);

  // Hack
  doc.file = {id: "../local/testwrite.mawe.gz", name: "testwrite.mawe.gz"}
  doc.compress = false;

  doc.save();
}

//-----------------------------------------------------------------------------
// Sanity check: check that if you load a file and save it unchanged, you
// get equal results.
//-----------------------------------------------------------------------------

async function testwrite_2() {
  const doc1 = await document.load("../local/Beltane.mawe");
  console.log("Original file:", doc1.file);

  // Hack
  doc1.file = {id: "../local/Beltane.A.mawe", name: "Beltane.A.mawe"}
  await doc1.save();
  console.log("File A:", doc1.file);

  const doc2 = await document.load("../local/Beltane.A.mawe");
  doc2.file = {id: "../local/Beltane.B.mawe", name: "Beltane.B.mawe"}
  await doc2.save();
  console.log("File B:", doc1.file);

  const {file2buf} = require("../src/document/util");

  const buf1 = await file2buf(doc1.file);
  const buf2 = await file2buf(doc2.file);

  console.log(buf1 === buf2 ? "Good: files are equal" : "ERROR: Files differ!");
}

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

async function testwatch() {
  const nodefs = require('fs');
  
  const fileid = '../local/watchthis';
  
  console.log(`Watching for file changes on ${fileid}`);
  
  /*
  const watcher = nodefs.promises.watch(fileid);

  for await (const event of watcher) console.log(event);

  /*/
  nodefs.watch(fileid, (event, filename) => {
    //if (filename) {
      console.log(`${event} -> ${filename}`);
      return true;
    //}
  });
  /**/
}