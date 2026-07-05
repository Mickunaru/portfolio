export function TerraformCard() {
  // Syntax highlighting token wrappers
  const K = ({ children }: { children: React.ReactNode }) => <span className="tf-k">{children}</span>; // Keyword
  const S = ({ children }: { children: React.ReactNode }) => <span className="tf-s">{children}</span>; // String
  const C = ({ children }: { children: React.ReactNode }) => <span className="tf-c">{children}</span>; // Comment
  const N = ({ children }: { children: React.ReactNode }) => <span className="tf-n">{children}</span>; // Number
  const F = ({ children }: { children: React.ReactNode }) => <span className="tf-f">{children}</span>; // Function
  const R = ({ children }: { children: React.ReactNode }) => <span className="tf-r">{children}</span>; // Reference
  const M = ({ children }: { children: React.ReactNode }) => <span className="tf-m">{children}</span>; // Module

  return (
    <div className="tf-bg flex aspect-video w-full flex-col border border-line overflow-hidden rounded-md shadow-lg transition-colors duration-300">
      {/* Scoped CSS block for hydration-safe Theme toggling */}
      <style dangerouslySetInnerHTML={{
        __html: `
        /* Light Mode Defaults */
        .tf-bg { background-color: #ffffff; color: #333333; }
        .tf-header { background-color: #f3f3f3; border-bottom-color: #e5e5e5; }
        .tf-icon { color: #0000ff; }
        .tf-k { color: #0000ff; }
        .tf-s { color: #a31515; }
        .tf-c { color: #008000; font-style: italic; opacity: 0.8; }
        .tf-n { color: #098658; }
        .tf-f { color: #795e26; }
        .tf-r { color: #001080; }
        .tf-m { color: #267f99; }

        /* Dark Mode Overrides (Triggered by your ThemeToggle) */
        [data-theme='night'] .tf-bg { background-color: #1e1e1e; color: #cccccc; }
        [data-theme='night'] .tf-header { background-color: #252526; border-bottom-color: #333333; }
        [data-theme='night'] .tf-icon { color: #569cd6; }
        [data-theme='night'] .tf-k { color: #569cd6; }
        [data-theme='night'] .tf-s { color: #ce9178; }
        [data-theme='night'] .tf-c { color: #6a9955; font-style: italic; opacity: 0.8; }
        [data-theme='night'] .tf-n { color: #b5cea8; }
        [data-theme='night'] .tf-f { color: #dcdcaa; }
        [data-theme='night'] .tf-r { color: #4fc1ff; }
        [data-theme='night'] .tf-m { color: #4ec9b0; }
      `}} />

      {/* IDE Chrome */}
      <div className="tf-header flex items-center gap-2 border-b px-4 py-2 transition-colors duration-300">
        <span className="tf-icon">#</span>
        <span className="font-mono text-[11px] tracking-wide opacity-80">
          main.tf — Master-Replica AWS Cluster
        </span>
      </div>

      {/* Code Area */}
      <div className="flex flex-1 flex-col justify-start px-6 py-4 font-mono text-[10px] leading-[1.6] sm:text-[11px] overflow-y-auto custom-scrollbar">
        <pre>
          <code>
            <K>module</K> <S>"vpc"</S> {"{"}
            <br />
            {"  "}source  = <S>"terraform-aws-modules/vpc/aws"</S>
            <br />
            {"  "}name    = <S>"log8415-vpc"</S>
            <br />
            {"  "}cidr    = <S>"10.0.0.0/16"</S>
            <br />
            {"  "}enable_nat_gateway = <K>true</K>
            <br />
            {"}"}
            <br />
            <br />
            <C># ... [gatekeeper & proxy security groups omitted] ...</C>
            <br />
            <br />
            <K>module</K> <S>"sg_manager"</S> {"{"}
            <br />
            {"  "}source = <S>"terraform-aws-modules/security-group/aws"</S>
            <br />
            {"  "}name   = <S>"manager-sg"</S>
            <br />
            {"  "}vpc_id = <R>module</R>.<M>vpc</M>.vpc_id
            <br />
            <br />
            {"  "}ingress_with_source_security_group_id = [
            <br />
            {"    "}{"{"} <C># Only allow MySQL traffic from internal proxy & workers</C>
            <br />
            {"      "}rule                     = <S>"mysql-tcp"</S>
            <br />
            {"      "}source_security_group_id = <R>module</R>.<M>sg_proxy</M>.security_group_id
            <br />
            {"    "}{"}"}
            <br />
            {"  "}]
            <br />
            {"}"}
            <br />
            <br />
            <C># ... [IAM roles & AMI fetching omitted] ...</C>
            <br />
            <br />
            <K>module</K> <S>"proxy"</S> {"{"}
            <br />
            {"  "}source        = <S>"terraform-aws-modules/ec2-instance/aws"</S>
            <br />
            {"  "}name          = <S>"proxy"</S>
            <br />
            {"  "}instance_type = <R>var</R>.proxy_instance_type
            <br />
            <br />
            {"  "}<C># Inject dynamic cluster IPs into Python proxy initialization</C>
            <br />
            {"  "}user_data = <F>templatefile</F>(<S>"$\u007Bpath.module\u007D/scripts/setup_proxy.sh"</S>, {"{"}
            <br />
            {"    "}manager_ip      = <R>module</R>.<M>manager</M>.private_ip
            <br />
            {"    "}worker1_ip      = <R>module</R>.<M>worker1</M>.private_ip
            <br />
            {"    "}worker2_ip      = <R>module</R>.<M>worker2</M>.private_ip
            <br />
            {"  "}{"}"})
            <br />
            {"}"}
            <br />
            <br />
            <K>module</K> <S>"manager"</S> {"{"}
            <br />
            {"  "}source        = <S>"terraform-aws-modules/ec2-instance/aws"</S>
            <br />
            {"  "}name          = <S>"manager"</S> <C># Master DB Node</C>
            <br />
            {"  "}instance_type = <R>var</R>.manager_instance_type
            <br />
            <br />
            {"  "}user_data = <F>templatefile</F>(<S>"$\u007Bpath.module\u007D/scripts/setup_manager.sh"</S>, {"{"}
            <br />
            {"    "}MYSQL_ROOT_PWD    = <R>var</R>.mysql_root_password
            <br />
            {"    "}MYSQL_REPLICA_PWD = <R>var</R>.mysql_replica_password
            <br />
            {"  "}{"}"})
            <br />
            {"}"}
            <br />
            <br />
            <K>module</K> <S>"worker1"</S> {"{"}
            <br />
            {"  "}source        = <S>"terraform-aws-modules/ec2-instance/aws"</S>
            <br />
            {"  "}name          = <S>"worker1"</S> <C># Read Replica</C>
            <br />
            <br />
            {"  "}user_data = <F>templatefile</F>(<S>"$\u007Bpath.module\u007D/scripts/setup_worker.sh"</S>, {"{"}
            <br />
            {"    "}SOURCE_IP = <R>module</R>.<M>manager</M>.private_ip
            <br />
            {"    "}SERVER_ID = <N>2</N>
            <br />
            {"  "}{"}"})
            <br />
            <br />
            {"  "}<C># Explicitly enforce execution order: Master must exist first</C>
            <br />
            {"  "}depends_on = [<R>module</R>.<M>manager</M>]
            <br />
            {"}"}
          </code>
        </pre>
      </div>
    </div>
  );
}