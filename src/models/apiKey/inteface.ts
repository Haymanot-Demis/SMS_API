import Base from "../baseModel/interface";
import IUser from "../user/interface";

export default interface IApiKey extends Base {
	user: IUser;
	key: string;
	expiratAt: Date;
}
