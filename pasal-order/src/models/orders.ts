import mongoose from 'mongoose';
import { OrderStatus } from '@pasal/common';
import { updateIfCurrentPlugin  } from 'mongoose-update-if-current';


export { OrderStatus };


interface OrderAttrs {
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
    products: object;
}

interface OrderDoc extends mongoose.Document {
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
    products: object;
    version: number
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
}

// Our order will never expires 
// It will stay as a cart to user 
// We are bulding multiple qty and product in cart 

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Created
    },
    expiresAt: {
        type: mongoose.Schema.Types.Date
    },
    products: {
        type: Array
    },
    confirmedEmail: {
        type: String
    }
}, {
    toJSON: {
        transform(doc ,ret) {
        ret.id = ret._id;
        delete ret._id;
        }
    }
});

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order(attrs);
}

const Order = mongoose.model<OrderDoc, OrderModel>('Model', orderSchema);

export { Order };