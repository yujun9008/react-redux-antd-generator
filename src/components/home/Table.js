import React from 'react';
import { Link } from 'react-router';

import styles from '../../styles/less/table.less'

class Table extends React.Component {
    
    render() {
        const { tableData, showLoading} = this.props;
        if(!tableData || !tableData.length) {
            if(showLoading){
                return null
            } else {
                return (
                    <div className={styles.nodata}>
                        抱歉，无符合查询结果的数据
                    </div>
                )
            }
            
        } else {
            let getTableRows = ()=>{
                let rows = [];
                let tr;
                tableData.forEach( (data, index)=>{
                    tr = <tr className={styles.row} key={'tr_' + index}>
                            <td className={styles.cell}>{index+1}</td>  
                            <td className={styles.cell}>{data.name}</td> 
                            <td className={styles.cell}>{data.email}</td> 
                            <td className={styles.cell}>{data.title}</td> 
                            <td className={styles.cell}><Link to={data.hash}>{data.hash}</Link></td>
                         </tr>;
                    rows[rows.length] = tr;
                } )
                return rows;
            }
            return (
                <table className={styles.main} id="componentsHomeTable">
                    <thead className={styles.header}>
                        <tr className={styles.row}>
                            <th className={styles['header-cell']}>
                                序号
                            </th>
                            <th className={styles['header-cell']}>
                                姓名
                            </th>
                            <th className={styles['header-cell']}>
                                邮箱
                            </th>
                            <th className={styles['header-cell']}>
                                职位
                            </th>
                            <th className={styles['header-cell']}>
                                详情
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {getTableRows()}
                    </tbody>
                </table>
            )
        }
    }
}

Table.defaultProps = {};

export default Table;