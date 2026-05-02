import pool from '@/lib/db';

export class ExperienceModel {
  static async getAll(lang: string = 'es') {
    const [rows]: any = await pool.query('SELECT * FROM experience WHERE lang = ? ORDER BY created_at DESC', [lang]);
    return rows;
  }

  static async create(data: any) {
    const { company, role, period, description, skills, location } = data;
    const [result]: any = await pool.query(
      'INSERT INTO experience (company, role, period, description, skills, location) VALUES (?, ?, ?, ?, ?, ?)',
      [company, role, period, description, skills, location ?? null]
    );
    return result.insertId;
  }

  static async delete(id: number) {
    await pool.query('DELETE FROM experience WHERE id = ?', [id]);
  }
}
