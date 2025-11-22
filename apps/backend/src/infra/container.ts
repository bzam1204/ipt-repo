import {container, DependencyContainer} from "tsyringe";
import {DatabaseConnectionAdapter, DatabaseConnectionAdapterToken} from "@/infra/database/DatabaseConnectionAdapter";
import {AccountRepository, AccountRepositoryToken} from "@/infra/repositories/AccountRepository";
import {MemberRepository, MemberRepositoryToken} from "@/infra/repositories/MemberRepository";
import {TokenProviderToken} from "@/application/services/token-provider";
import {JwtAdapter} from "@/infra/JwtAdapter";
import {Login, LoginToken} from "@/application/use-cases/Login/Login";
import {AdmitMember, AdmitMemberToken} from "@/application/use-cases/AdmitMember/AdmitMember";
import {FetchMembers, FetchMembersToken} from "@/application/use-cases/FetchMembers/FetchMembers";
import {CreateAccount, CreateAccountToken} from "@/application/use-cases/CreateAccount/CreateAccount";

container.registerSingleton(DatabaseConnectionAdapterToken, DatabaseConnectionAdapter);

container.register(AccountRepositoryToken, {useClass: AccountRepository});
container.register(MemberRepositoryToken, {useClass: MemberRepository})

container.register(TokenProviderToken, {useClass: JwtAdapter});

container.register(LoginToken, {useClass: Login});
container.register(AdmitMemberToken, {useClass: AdmitMember})
container.register(FetchMembersToken, {useClass: FetchMembers})
container.register(CreateAccountToken, {useClass: CreateAccount});

export const Container: DependencyContainer = container;
