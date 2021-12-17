export class Card {
  id: number;
  taskId: string;
  description: string;
  estimation: number;
  type: string;
  alone: boolean;
  constructor(id: number, taskId: string, description: string, estimation: number, type: string, alone: boolean) {
    this.id = id;
    this.taskId = taskId;
    this.description = description;
    this.estimation = estimation;
    this.type = type;
    this.alone = alone;
  }
}
