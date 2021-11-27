import { HttpException, HttpStatus } from "@nestjs/common";
import * as TeachableMachine from "@sashido/teachablemachine-node";
const model = new TeachableMachine({
  modelUrl:"https://teachablemachine.withgoogle.com/models/RJSvtvx8O/"
});
 export const  Predict=async (image)=>{
  try{
    let res=await model.classify({
	        imageUrl: "https://media-blog.sashido.io/content/images/2020/09/SashiDo_Dog.jpg",
      });
      return res[0];
    }
    catch(e){
        throw new HttpException({status:500,error:"Error Occur In Image Recognizer"},500)
    }
}