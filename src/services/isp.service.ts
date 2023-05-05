import dataSource from '../libs/postgres.pool';
import { isps } from '../db/models/isp.model';
import { CreateIspDto } from '../schemas/isp.schema';

export class IspService {
  private ispRepository;

  constructor() {
    this.ispRepository = dataSource.getRepository(isps);
  }

  async create(ispData: CreateIspDto) {
    const newIsp = new isps();
    newIsp.name = ispData.name;
    newIsp.urlImage = ispData.urlImage;
    newIsp.availableIn = ispData.availableIn;

    await this.ispRepository.save(newIsp);

    return newIsp;
  }

  async findAll(country: string) {
    const isps = await this.ispRepository.find();
    const ispsInCountry = isps.filter((isp) => isp.availableIn === country);

    return ispsInCountry;
  }

  async delete(id: number) {
    const isp = await this.ispRepository.findOne({
      where: { id },
    });

    console.log(isp);

    if (!isp) throw new Error('ISP not found');

    await this.ispRepository.remove(isp);
  }
}
