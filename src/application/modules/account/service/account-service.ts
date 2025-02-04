import { ApiService } from "@/application/shared/services/api-service";
import { CreatePaymentDetailsDTO, CreatePaymentDetailsResponse, GetPaymentDetailsResponse, UpdatePaymentDetailsDTO, UpdatePaymentDetailsResponse } from "./dto/payment-details-dto";

export class AccountService extends ApiService {
  private readonly baseUrl: string

  constructor() {
    super();
    this.baseUrl = '/accounts'
  }

  async createPaymentDetails(createPaymentDetailsDTO: CreatePaymentDetailsDTO) {
    return this.httpClient.post<CreatePaymentDetailsResponse>(`${this.baseUrl}/payments-details`, createPaymentDetailsDTO);
  }

  async updatePaymentDetails(updatePaymentDetailsDTO: UpdatePaymentDetailsDTO) {
    return this.httpClient.put<UpdatePaymentDetailsResponse>(`${this.baseUrl}/payments-details`, updatePaymentDetailsDTO);
  }

  async getPaymentDetails() {
    return this.httpClient.get<GetPaymentDetailsResponse>(`${this.baseUrl}/payments-details/login`)
  }
}