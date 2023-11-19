import prisma from "../db"

// get all products
export const getProducts = async (req: any, res: any) => {

    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            Products: true
        }
    })

    res.json({data: user?.Products})

}

//get a single product
export const getProduct = async (req: any, res: any) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.params.id,
            belongsTOId: req.user.id
        }
    })
    res.json({data: product})
}

//create a product
export const createProduct = async (req: any, res: any) => {
    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            belongsTOId: req.user.id
        }
    })
    res.json({data: product})
}

//update a product
export const updateProduct = async (req: any, res: any) => {
    const product = await prisma.product.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name
        }
    })
    res.json({data: product})
}

//delete a product
export const deleteProduct = async (req: any, res: any) => {
    const deleted = await prisma.product.delete({
        where: {
            id: req.params.id,
            belongsTOId: req.user.id,
            
        }
    })
    res.json({data: deleted})
}