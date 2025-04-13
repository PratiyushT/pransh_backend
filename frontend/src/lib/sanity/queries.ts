
// Get all categories
export const allCategoriesQuery = `
  *[_type == "category"] | order(name asc) {
  _id,
  name,
  image {
    asset->{
      url
    }
  }
}

`
// Get all colors
export const allColorsQuery = `
*[_type == "color"] | order(name asc) {
  _id,
  name,
  hex
}
`

//Get all sizes
export const allSizesQuery = `
*[_type == "size"] | order(name asc) {
  _id,
  name
}
`


//Count Total Products
export const totalProductCountQuery = 'count(*[_type == "product"])'

//Fetch products ordered by newest first
//and only return a specific range for pagination
export const paginatedProductsQuery = (start: number, end: number) => `
*[_type == 'product'] | order(_createdAt desc) [${start}...${end}] {
  _id,
  name,
  description,
  isFeatured,
  rating,
  "category": category->name,
  variants[]{
    sku,
    price,
    stock,
    "size": size->name,
    "color": color->{
      name,
      hex
    },
    images[]{
      "url": asset->url
    }
  }
}
`

// Fetch Single Product By ID
export const singleProductQuery = (id: string) => `
*[_type == 'product' && _id == "${id}"][0] {
  _id,
  name,
  description,
  isFeatured,
  rating,
  "category": category->name,
  variants[]{
    sku,
    price,
    stock,
    "size": size->name,
    "color": color->{
      name,
      hex
    },
    images[]{
      "url": asset->url
    }
  }
}
`
//Find all products where the name contains
// the search term — case-insensitive
//and return them ordered by newest
//within a range for pagination.
export const searchProductsQuery = (start: number, end: number, searchTerm:string) => `
*[_type == "product" && lower(name) match "*${searchTerm.toLowerCase()}*"] 
| order(_createdAt desc) 
[${start}...${end}] {
  _id,
  name,
  description,
  isFeatured,
  rating,
  "category": category->name,
  variants[]{
    sku,
    price,
    stock,
    "size": size->name,
    "color": color->{
      name,
      hex
    },
    images[]{
      asset->{
        url
      }
    }
  }
}
`


// Fetch Single Product By ID
export const featuredProductsQuery = (start: number, end: number, searchTerm:string) => `
*[_type == 'product' && isFeatured == true] 
| order(_createdAt desc) 
[${start}...${end}] {
  _id,
  name,
  description,
  isFeatured,
  rating,
  "category": category->name,
  variants[]{
    sku,
    price,
    stock,
    "size": size->name,
    "color": color->{
      name,
      hex
    },
    images[]{
      asset->{
        url
      }
    }
  }
}
`

//Filter products by their category reference id
//Newest products first
//With pagination
export const categoryProductsQuery = (start: number, end: number, categoryId:string) => `
*[_type == 'product' && category._ref == "${categoryId}"] 
| order(_createdAt desc) 
[${start}...${end}] {
  _id,
  name,
  description,
  isFeatured,
  rating,
  "category": category->name,
  variants[]{
    sku,
    price,
    stock,
    "size": size->name,
    "color": color->{
      name,
      hex
    },
    images[]{
      asset->{
        url
      }
    }
  }
}
`