export function slugify(text: string): string {
  return text
    .normalize('NFD') // rozdělí znaky s diakritikou
    .replace(/[\u0300-\u036f]/g, '') // odstraní diakritiku
    .toLowerCase() // převede na malá písmena
    .trim() // odstraní bílé znaky na začátku/konci
    .replace(/[^a-z0-9\s-]/g, '') // odstraní speciální znaky kromě pomlček a mezer
    .replace(/\s+/g, '-') // mezery nahradí pomlčkami
    .replace(/-+/g, '-'); // vícenásobné pomlčky sloučí
}
