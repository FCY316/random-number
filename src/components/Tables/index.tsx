import { Pagination, Table } from "antd"
import { GetComponentProps } from 'rc-table/lib/interface'
import './index.scss'
import { memo } from "react"
import Empty from "../Empty"
const Tables = (props: { keys: string, columns: any[], data: any[], width?: number, loading?: boolean, pagination?: boolean, total?: number, onChanges?: Function, onRow?: GetComponentProps<any> | undefined }) => {
    const { keys, columns, data, width = 600, loading = false, pagination = false, total = 0, onChanges = null, onRow = undefined } = props

    // 切换页数
    const onChange = (page: number) => {
        onChanges && onChanges(page)
    }
    return (
        <div className='tables'>
            <div className="tables-w" style={{
                width: `${width}px`
            }}>
                <div className='tables-context' >
                    <Table
                        rowKey={(record) => {
                            return record[keys]
                        }}
                        onRow={onRow}
                        loading={loading}
                        locale={{ emptyText: <Empty /> }}
                        pagination={false}
                        columns={columns}
                        dataSource={data}
                        bordered={false}
                    />
                </div>
                {
                    pagination &&
                    <Pagination
                        onChange={onChange}
                        className="tables-pagination"
                        showSizeChanger={false}
                        hideOnSinglePage
                        defaultCurrent={1}
                        total={total} />
                }
            </div>

        </div>)
}

export default memo(Tables)