const getImageUrl = (name: any) => {
  return new URL(`../assets/${name}`, import.meta.url).href
}

export default getImageUrl
