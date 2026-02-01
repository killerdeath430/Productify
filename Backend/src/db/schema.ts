import { pgTable, PgTable,text ,timestamp,uuid } from "drizzle-orm/pg-core";
import { Relation, relations } from "drizzle-orm";

export  const users = pgTable("users",{
    id:text("id").primaryKey(), //clerkID
    email:text("email").notNull().unique(),
    name:text("name"),
    imageUrl:text("image_url"),
    createdAt:timestamp("created_at",{mode:"date"}).notNull().defaultNow(),
    updatedAt:timestamp("updated_at",{mode:"date"}).notNull().defaultNow()
});

export const products=pgTable("products",{
    id:uuid("id").defaultRandom().primaryKey(),
    title:text("title").notNull(),
    description:text("description"),
    imageUrl:text("image_url").notNull(),
    createdAt:timestamp("created_at",{mode:"date"}).notNull().defaultNow(),
    updatedAt:timestamp("updated_at",{mode:"date"}).notNull().defaultNow(),
    //knowing the deletion of the user should delete the prodcuts as well
    userId: text("user_id")
    .notNull()
    .references(()=>users.id,{onDelete:"cascade"})

});

export const comments =pgTable("comments",{
    id:uuid("id").defaultRandom().primaryKey(),
    content:text("content").notNull(),
    createdAt:timestamp("craeted_at",{mode:"date"}).notNull().defaultNow(),

    userId:text("user_id")
    .notNull()
    .references(()=> users.id,{onDelete :"cascade"}),
    productId:text("product_id")
    .notNull()
    .references(()=>products.id,{onDelete:"cascade"}),

});


//relations
export const userRelations = relations(users,({many})=>({
    products:many(products),
    comments:many (comments)
}));

export const productsRelations = relations(products,({one,many})=>({
comments:many(comments),
user : one(users,{  fields:[products.userId],references:[users.id] }),
}))

export const  commentsRelations=relations(comments,({one})=>({
    user:one(users,{fields:[comments.userId],references:[users.id]}),

    product:one(products,{fields:[comments.productId],references:[products.id]}),
}));

//Type inference

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert

export type Products= typeof products.$inferSelect
export type NewProducts = typeof products.$inferInsert

export type Comments = typeof comments.$inferSelect
export type NewComments= typeof comments.$inferInsert


