import { HttpException, HttpStatus } from "@nestjs/common";
import * as TeachableMachine from "@sashido/teachablemachine-node";
const model = new TeachableMachine({
  modelUrl:"https://teachablemachine.withgoogle.com/models/RJSvtvx8O/"
});
 export const  Predict=async (image)=>{
  try{
      console.log("--->",image);
    let res=await model.classify({
	        imageUrl: `http://switchfood.herokuapp.com/${image}`,
      });
      return res[0];
    }
    catch(e){
        console.log(e)
        throw new HttpException({status:500,error:"Error Occur In Image Recognizer"},500)
    }
}