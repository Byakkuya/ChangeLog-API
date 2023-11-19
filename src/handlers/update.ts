import prisma from "../db"

export const getUpdates = async (req: any, res: any) => {
    const updates = await prisma.update.findMany({
        where: {
            productId: req.params.id
        }
    })
    res.json({ data: updates })

}

export const getUpdate = async (req: any, res: any) => {
    const products = await prisma.product.findMany({
        where: {
            belongsTOId: req.user.id
        },
        include: {
            updates: true
        }
    })
    const updates = products.reduce((allUpdates: any, product: any) => {
        return [...allUpdates, ...product.updates]
    }, [])
    req.json({ data: updates })

}

/*export const createUpdate = async (req:any, res:any) => {
  

    const product = await prisma.product.findUnique({
      where: {
        id: req.body.productId
      }
    })
  
    if (!product) {
      // does not belong to user
      return res.json({message: 'nope'})
    }
  
    const update = await prisma.update.create({
      data: {
        title: req.body.title,
        body: req.body.body,
        product: {connect: {id: product.id}}
      }
    })
  
    res.json({data: update})
  }
*/
export const updateUpdate = async (req: any, res: any) => {
    const products = await prisma.product.findMany({
        where: {
            belongsTOId: req.user.id,


        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates: any, product: any) => {
        return [...allUpdates, ...product.updates]
    }, [])

    const match = updates.find((update: any) => update.id === req.params.id)
    if (!match) {
        return res.status(404).json({ error: 'leeeeeeeeeee' })
    }
    const updated = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })
    res.json({ data: updated })
}

export const deleteUpdate = async (req: any, res: any) => {
    const products = await prisma.product.findMany({
        where: {
            belongsTOId: req.user.id
        },
        include: {
            updates: true
        }
    })
    const updates = products.reduce((allUpdates: any, product: any) => {
        return [...allUpdates, ...product.updates]
    }, [])
    const match = updates.find((update: any) => update.id === req.params.id)
    if (!match) {
        return res.status(404).json({ error: 'lee' })
    }
    const deleted = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    })
    res.json({ data: deleted })
}
