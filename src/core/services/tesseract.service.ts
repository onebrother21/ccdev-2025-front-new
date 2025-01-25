/*
import { Injectable } from "@angular/core";
import { createWorker } from "tesseract.js";
import * as fs from "fs";
import PDFParser,{StringifyStream} from "pdf2json";

@Injectable({providedIn:"root"})
export class TesseractService {
  result = "Recognizing...";
  constructor(){}
  async readImg(filename:string){
    try{
      const worker = createWorker();//{logger: m => console.log(m)});
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      const {data:{text}} = await worker.recognize(filename);
      await worker.terminate();
      return text;
    }
    catch(e){console.error(e);
    }
  }
  async readPdf(filename:string){
    let inputStream = fs.createReadStream(filename,{highWaterMark:64 * 1024});
    let outputStream = fs.createWriteStream(filename.replace("pdf","json"));
    inputStream.pipe(new PDFParser()).pipe(new StringifyStream()).pipe(outputStream);
  }
}
*/