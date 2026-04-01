import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { randomBytes } from 'crypto';

@Injectable()
export class StorageService {
  private readonly uploadDir = path.join(process.cwd(), 'uploads');

  constructor() {
    // Créer le dossier uploads s'il n'existe pas
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  /**
   * Sauvegarde un fichier en local et retourne l'URL
   */
  saveFile(file: any): string {
    if (!file) {
      throw new Error('No file provided');
    }

    const randomId = randomBytes(8).toString('hex');
    const filename = `${randomId}-${file.originalname}`;
    const filepath = path.join(this.uploadDir, filename);

    // Sauvegarder le fichier
    fs.writeFileSync(filepath, file.buffer);

    // Retourner l'URL relative
    return `/uploads/${filename}`;
  }

  /**
   * Supprime un fichier
   */
  deleteFile(fileUrl: string): boolean {
    try {
      const filename = path.basename(fileUrl);
      const filepath = path.join(this.uploadDir, filename);

      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }
}
