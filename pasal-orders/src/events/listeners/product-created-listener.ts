import { ProductCreatedEvent, Subjects, Listener } from "@pasal/common";
//import { Listener } from "../../common/base-listener";
import { Product } from "../../models/products";

export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
  subject: string = Subjects.ProductCreated;

  async onMessage(data: ProductCreatedEvent["data"], message: any) {
    console.log(`Message reveived on ProductCreatedListener`);
    let parseMessage = JSON.parse(data.toString());
    const { price, name, userId, category, subCategory, availableItems } =
      parseMessage;
    const product = Product.build({
      name,
      userId,
      price,
      category,
      subCategory,
      availableItems,
    });
    await product.save();
    console.log(product);
  }
}
