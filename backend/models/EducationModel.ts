import pool from '@/lib/db';

export class EducationModel {
  static async getAll() {
    const [rows]: any = await pool.query('SELECT * FROM education ORDER BY created_at DESC');
    return rows;
  }

  static async create(data: any) {
    const { institution, title, period, logo_url } = data;
    const [result]: any = await pool.query(
      'INSERT INTO education (institution, title, period, logo_url) VALUES (?, ?, ?, ?)',
      [institution, title, period, logo_url]
    );
    return result.insertId;
  }

  static async delete(id: number) {
    await pool.query('DELETE FROM education WHERE id = ?', [id]);
  }
}
