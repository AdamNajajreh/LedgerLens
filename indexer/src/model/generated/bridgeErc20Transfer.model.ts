import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, IntColumn as IntColumn_, BigIntColumn as BigIntColumn_, Index as Index_} from "@subsquid/typeorm-store"

@Entity_()
export class BridgeERC20Transfer {
    constructor(props?: Partial<BridgeERC20Transfer>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    logIndex!: number

    @BigIntColumn_({nullable: false})
    blockNumber!: bigint

    @BigIntColumn_({nullable: false})
    timestamp!: bigint

    @Index_()
    @StringColumn_({nullable: false})
    from!: string

    @Index_()
    @StringColumn_({nullable: false})
    to!: string

    @BigIntColumn_({nullable: false})
    amount!: bigint

    @StringColumn_({nullable: true})
    bridgeName!: string | undefined | null

    @StringColumn_({nullable: true})
    direction!: string | undefined | null

    @StringColumn_({nullable: true})
    destinationChain!: string | undefined | null
}
