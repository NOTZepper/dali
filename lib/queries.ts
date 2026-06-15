import { supabase } from './supabase'
import type { Project, Service } from './studio-data'

export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('id, title, description')
    .order('sort_order')

  if (error) throw new Error(error.message)
  return data as Service[]
}

export async function getProjects(): Promise<Project[]> {
  const { data: rows, error } = await supabase
    .from('projects')
    .select(`
      id, title, category, year, image_url, span, description,
      project_gallery ( image_url, sort_order )
    `)
    .order('sort_order')

  if (error) throw new Error(error.message)

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    category: row.category,
    year: row.year,
    image: row.image_url,
    span: row.span,
    description: row.description,
    gallery: (row.project_gallery as { image_url: string; sort_order: number }[])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((g) => g.image_url),
  }))
}
